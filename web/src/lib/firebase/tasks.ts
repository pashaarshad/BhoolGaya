// ========================================
// BhoolGaya? - Task Service (Firestore)
// ========================================

import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy,
    Timestamp,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Task, CreateTaskInput, UpdateTaskInput, FilterStatus } from '@/lib/types';

const TASKS_COLLECTION = 'tasks';

// Convert Firestore timestamp to Date
const convertTimestamp = (timestamp: Timestamp | undefined): Date => {
    return timestamp ? timestamp.toDate() : new Date();
};

// Convert Firestore document to Task
const convertToTask = (doc: { id: string; data: () => Record<string, unknown> }): Task => {
    const data = doc.data();
    return {
        id: doc.id,
        userId: data.userId as string,
        title: data.title as string,
        description: data.description as string | undefined,
        taskDate: convertTimestamp(data.taskDate as Timestamp),
        createdAt: convertTimestamp(data.createdAt as Timestamp),
        completedAt: data.completedAt ? convertTimestamp(data.completedAt as Timestamp) : undefined,
        status: data.status as 'pending' | 'completed',
        ageInDays: data.ageInDays as number,
        important: data.important as boolean,
        urgent: data.urgent as boolean,
        originalDate: convertTimestamp(data.originalDate as Timestamp),
        carryForwardCount: data.carryForwardCount as number,
        reminderEnabled: data.reminderEnabled as boolean,
        reminderInterval: data.reminderInterval as Task['reminderInterval'],
        customReminderMinutes: data.customReminderMinutes as number | undefined,
        source: data.source as Task['source'],
        sourceReference: data.sourceReference as string | undefined,
        confidenceScore: data.confidenceScore as number | undefined,
        preferredLocation: data.preferredLocation as string | undefined,
        remoteAllowed: data.remoteAllowed as boolean,
        category: data.category as string | undefined,
        tags: data.tags as string[] | undefined,
    };
};

// Get all tasks for a user
export const getTasks = async (userId: string, status?: FilterStatus): Promise<Task[]> => {
    try {
        let q = query(
            collection(db, TASKS_COLLECTION),
            where('userId', '==', userId),
            orderBy('taskDate', 'desc')
        );

        if (status && status !== 'all') {
            q = query(
                collection(db, TASKS_COLLECTION),
                where('userId', '==', userId),
                where('status', '==', status),
                orderBy('taskDate', 'desc')
            );
        }

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => convertToTask({ id: doc.id, data: () => doc.data() }));
    } catch (error) {
        console.error('Error getting tasks:', error);
        throw error;
    }
};

// Get a single task
export const getTask = async (taskId: string): Promise<Task | null> => {
    try {
        const docRef = doc(db, TASKS_COLLECTION, taskId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return convertToTask({ id: docSnap.id, data: () => docSnap.data() });
        }
        return null;
    } catch (error) {
        console.error('Error getting task:', error);
        throw error;
    }
};

// Create a new task
export const createTask = async (userId: string, input: CreateTaskInput): Promise<Task> => {
    try {
        const now = new Date();
        const taskDate = input.taskDate || now;

        const taskData = {
            userId,
            title: input.title,
            description: input.description || '',
            taskDate: Timestamp.fromDate(taskDate),
            createdAt: serverTimestamp(),
            completedAt: null,
            status: 'pending',
            ageInDays: 0,
            important: input.important || false,
            urgent: input.urgent || false,
            originalDate: Timestamp.fromDate(taskDate),
            carryForwardCount: 0,
            reminderEnabled: input.reminderEnabled ?? true,
            reminderInterval: input.reminderInterval || 60,
            customReminderMinutes: input.customReminderMinutes,
            source: 'manual',
            remoteAllowed: true,
            category: input.category,
            tags: input.tags || [],
        };

        const docRef = await addDoc(collection(db, TASKS_COLLECTION), taskData);

        return {
            id: docRef.id,
            ...taskData,
            taskDate,
            createdAt: now,
            originalDate: taskDate,
        } as Task;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

// Update a task
export const updateTask = async (taskId: string, input: UpdateTaskInput): Promise<void> => {
    try {
        const docRef = doc(db, TASKS_COLLECTION, taskId);

        const updateData: Record<string, unknown> = {};

        if (input.title !== undefined) updateData.title = input.title;
        if (input.description !== undefined) updateData.description = input.description;
        if (input.taskDate !== undefined) updateData.taskDate = Timestamp.fromDate(input.taskDate);
        if (input.important !== undefined) updateData.important = input.important;
        if (input.urgent !== undefined) updateData.urgent = input.urgent;
        if (input.reminderEnabled !== undefined) updateData.reminderEnabled = input.reminderEnabled;
        if (input.reminderInterval !== undefined) updateData.reminderInterval = input.reminderInterval;
        if (input.customReminderMinutes !== undefined) updateData.customReminderMinutes = input.customReminderMinutes;
        if (input.category !== undefined) updateData.category = input.category;
        if (input.tags !== undefined) updateData.tags = input.tags;

        await updateDoc(docRef, updateData);
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

// Complete a task
export const completeTask = async (taskId: string): Promise<void> => {
    try {
        const docRef = doc(db, TASKS_COLLECTION, taskId);
        await updateDoc(docRef, {
            status: 'completed',
            completedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error completing task:', error);
        throw error;
    }
};

// Uncomplete a task (mark as pending)
export const uncompleteTask = async (taskId: string): Promise<void> => {
    try {
        const docRef = doc(db, TASKS_COLLECTION, taskId);
        await updateDoc(docRef, {
            status: 'pending',
            completedAt: null,
        });
    } catch (error) {
        console.error('Error uncompleting task:', error);
        throw error;
    }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
    try {
        const docRef = doc(db, TASKS_COLLECTION, taskId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

// Get tasks for today
export const getTodayTasks = async (userId: string): Promise<Task[]> => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const q = query(
            collection(db, TASKS_COLLECTION),
            where('userId', '==', userId),
            where('taskDate', '>=', Timestamp.fromDate(today)),
            where('taskDate', '<', Timestamp.fromDate(tomorrow)),
            orderBy('taskDate', 'asc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => convertToTask({ id: doc.id, data: () => doc.data() }));
    } catch (error) {
        console.error('Error getting today tasks:', error);
        throw error;
    }
};
