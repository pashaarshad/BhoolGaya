'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/Input';
import './page.css';

// Mock data for demonstration
interface Task {
    id: string;
    title: string;
    status: 'pending' | 'completed';
    ageInDays: number;
    important: boolean;
    urgent: boolean;
    category?: string;
}

const mockTasks: Task[] = [
    { id: '1', title: 'Complete DSA Practice - Arrays', status: 'pending', ageInDays: 0, important: true, urgent: true },
    { id: '2', title: 'Read Chapter 5 - Operating Systems', status: 'pending', ageInDays: 1, important: true, urgent: false },
    { id: '3', title: 'Submit Assignment - DBMS', status: 'pending', ageInDays: 2, important: true, urgent: true },
    { id: '4', title: 'Review lecture notes', status: 'pending', ageInDays: 3, important: false, urgent: false },
    { id: '5', title: 'Morning exercise', status: 'completed', ageInDays: 0, important: true, urgent: false },
];

type FilterStatus = 'all' | 'pending' | 'completed';

export default function DashboardPage() {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [filter, setFilter] = useState<FilterStatus>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskImportant, setNewTaskImportant] = useState(false);
    const [newTaskUrgent, setNewTaskUrgent] = useState(false);

    // Get current date formatted
    const today = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = today.toLocaleDateString('en-US', dateOptions);

    // Filter tasks
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        return task.status === filter;
    });

    // Calculate stats
    const pendingCount = tasks.filter((t) => t.status === 'pending').length;
    const completedCount = tasks.filter((t) => t.status === 'completed').length;
    const criticalCount = tasks.filter((t) => t.status === 'pending' && t.ageInDays >= 3).length;

    // Get age class
    const getAgeClass = (task: Task) => {
        if (task.status === 'completed') return 'task-item--completed';
        if (task.ageInDays === 0) return 'task-item--today';
        if (task.ageInDays === 1) return 'task-item--yesterday';
        if (task.ageInDays === 2) return 'task-item--2days';
        return 'task-item--critical';
    };

    // Get age badge
    const getAgeBadge = (task: Task) => {
        if (task.status === 'completed') return null;
        if (task.ageInDays === 0) return null;
        if (task.ageInDays === 1) return { text: '🟡 Yesterday', class: 'task-badge--age-yesterday' };
        if (task.ageInDays === 2) return { text: '🔵 2 days old', class: 'task-badge--age-2days' };
        return { text: '🔴 Critical', class: 'task-badge--age-critical' };
    };

    // Toggle task completion
    const toggleTask = (taskId: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId
                    ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
                    : task
            )
        );
    };

    // Delete task
    const deleteTask = (taskId: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    // Add new task
    const handleAddTask = () => {
        if (!newTaskTitle.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            title: newTaskTitle.trim(),
            status: 'pending',
            ageInDays: 0,
            important: newTaskImportant,
            urgent: newTaskUrgent,
        };

        setTasks((prev) => [newTask, ...prev]);
        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskImportant(false);
        setNewTaskUrgent(false);
        setIsModalOpen(false);
    };

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="dashboard-logo">
                    🎯 <span>BhoolGaya?</span>
                </div>

                <nav className="dashboard-nav">
                    <Link href="/dashboard" className="dashboard-nav-link dashboard-nav-link--active">
                        Tasks
                    </Link>
                    <Link href="/matrix" className="dashboard-nav-link">
                        Matrix
                    </Link>
                    <Link href="/analytics" className="dashboard-nav-link">
                        Analytics
                    </Link>
                    <Link href="/settings" className="dashboard-nav-link">
                        Settings
                    </Link>
                </nav>

                <div className="dashboard-user">
                    <div className="dashboard-avatar">U</div>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Welcome */}
                <div className="dashboard-welcome">
                    <h1 className="dashboard-greeting">Good evening! 👋</h1>
                    <p className="dashboard-date">{formattedDate}</p>
                </div>

                {/* Stats */}
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <span className="stat-card__label">Total Tasks</span>
                        <span className="stat-card__value">{tasks.length}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-card__label">Pending</span>
                        <span className="stat-card__value stat-card__value--pending">{pendingCount}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-card__label">Completed</span>
                        <span className="stat-card__value stat-card__value--completed">{completedCount}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-card__label">Critical</span>
                        <span className="stat-card__value stat-card__value--critical">{criticalCount}</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="dashboard-filters">
                    <button
                        className={`filter-tab ${filter === 'all' ? 'filter-tab--active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-tab ${filter === 'pending' ? 'filter-tab--active' : ''}`}
                        onClick={() => setFilter('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`filter-tab ${filter === 'completed' ? 'filter-tab--active' : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                </div>

                {/* Task List */}
                <div className="task-list">
                    {filteredTasks.length === 0 ? (
                        <div className="task-list-empty">
                            <div className="task-list-empty__icon">🎉</div>
                            <h3 className="task-list-empty__title">
                                {filter === 'completed' ? 'No completed tasks yet' : 'All caught up!'}
                            </h3>
                            <p className="task-list-empty__description">
                                {filter === 'completed'
                                    ? 'Complete some tasks to see them here.'
                                    : "BhoolGaya? Nope! You're free now."}
                            </p>
                            {filter !== 'completed' && (
                                <Button onClick={() => setIsModalOpen(true)}>Add a Task</Button>
                            )}
                        </div>
                    ) : (
                        filteredTasks.map((task) => {
                            const ageBadge = getAgeBadge(task);
                            return (
                                <div key={task.id} className={`task-item ${getAgeClass(task)}`}>
                                    <button
                                        className={`task-checkbox ${task.status === 'completed' ? 'task-checkbox--checked' : ''}`}
                                        onClick={() => toggleTask(task.id)}
                                        aria-label={task.status === 'completed' ? 'Mark as pending' : 'Mark as complete'}
                                    >
                                        {task.status === 'completed' && (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>

                                    <div className="task-content">
                                        <div className="task-title">{task.title}</div>
                                        <div className="task-meta">
                                            {ageBadge && (
                                                <span className={`task-badge task-badge--age ${ageBadge.class}`}>
                                                    {ageBadge.text}
                                                </span>
                                            )}
                                            {task.important && (
                                                <span className="task-badge task-badge--important">⭐ Important</span>
                                            )}
                                            {task.urgent && (
                                                <span className="task-badge task-badge--urgent">⚡ Urgent</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="task-actions">
                                        <button className="task-action-btn" aria-label="Edit task">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="task-action-btn task-action-btn--delete"
                                            onClick={() => deleteTask(task.id)}
                                            aria-label="Delete task"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>

            {/* FAB */}
            <button className="fab" onClick={() => setIsModalOpen(true)} aria-label="Add new task">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                </svg>
            </button>

            {/* Add Task Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Task"
                size="md"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddTask} disabled={!newTaskTitle.trim()}>
                            Add Task
                        </Button>
                    </>
                }
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <Input
                        label="Task Title"
                        placeholder="What do you need to do?"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        isRequired
                    />

                    <Textarea
                        label="Description (optional)"
                        placeholder="Add more details..."
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                    />

                    <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={newTaskImportant}
                                onChange={(e) => setNewTaskImportant(e.target.checked)}
                                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
                            />
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                ⭐ Important
                            </span>
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={newTaskUrgent}
                                onChange={(e) => setNewTaskUrgent(e.target.checked)}
                                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
                            />
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                ⚡ Urgent
                            </span>
                        </label>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
