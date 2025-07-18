"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Loader2, Tractor, Leaf, Package, ClipboardList, Store, Sparkles, PlusCircle, UserCog, LogOut, Menu, X, ShoppingCart, LayoutDashboard, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Market", href: "/market", icon: ShoppingCart },
  { name: "Profile", href: "/profile", icon: UserCog },
  { name: "AI Assistant", href: "/ai-assistant", icon: Sparkles },
  { name: "Logo Generator", href: "/logo-generator", icon: Sparkles },
];

const Dashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [summary, setSummary] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [sales, setSales] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [salesLoading, setSalesLoading] = useState(true);
  const [aiTip, setAiTip] = useState<string>("");
  const [aiTipLoading, setAiTipLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [userLoading, setUserLoading] = useState(true);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium"
  });
  const router = useRouter();

  // Fetch user profile for name (from Firestore)
  useEffect(() => {
    if (!user) return;
    setUserLoading(true);
    (async () => {
      const userRef = doc(db, "users", user.uid);
      try {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserName(userSnap.data().fullName || "");
        }
      } catch (error: any) {
        if (error.code === 'unavailable' || error.message.includes('offline')) {
          setUserName('Offline User'); // Or a placeholder
        } else {
          setUserName('Error Loading User');
        }
      }
      setUserLoading(false);
    })();
  }, [user]);

  // Mock farm summary
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setSummary({
        livestock: 12,
        crops: 8,
        equipment: 5,
      });
      setLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  // Mock today's tasks
  useEffect(() => {
    setTasksLoading(true);
    const timeout = setTimeout(() => {
      setTasks([
        { id: 1, title: "Feed the cows", dueDate: new Date() },
        { id: 2, title: "Irrigate maize field", dueDate: new Date() },
        { id: 3, title: "Check tractor oil", dueDate: new Date() },
      ]);
      setTasksLoading(false);
    }, 900);
    return () => clearTimeout(timeout);
  }, []);

  // Mock sales summary
  useEffect(() => {
    setSalesLoading(true);
    const timeout = setTimeout(() => {
      setSales({ count: 17 });
      setSalesLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Mock AI tip
  useEffect(() => {
    setAiTipLoading(true);
    const timeout = setTimeout(() => {
      setAiTip(
        "🌱 Tip: Rotate your crops each season to improve soil health and boost yields!"
      );
      setAiTipLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleLogout = async () => {
    const { doSignOut } = await import("../firebase/auth");
    await doSignOut();
    router.push("/login");
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        dueDate: new Date(newTask.dueDate),
        priority: newTask.priority,
        completed: false
      };
      setTasks(prev => [task, ...prev]);
      setNewTask({ title: "", description: "", dueDate: "", priority: "medium" });
      setShowAddTaskModal(false);
    }
  };

  const handleDateSelect = (date: string) => {
    setNewTask(prev => ({ ...prev, dueDate: date }));
    setShowDatePicker(false);
  };

  if (authLoading || loading || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-green-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col transition-transform duration-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:static sm:inset-auto sm:w-56`}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-xl font-bold text-green-700">AgriSmart</span>
          <button 
            className="p-1 hover:bg-gray-100 rounded" 
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarLinks.map((link) => (
            <Link key={link.name} href={link.href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-green-50 font-medium transition">
              <link.icon className="w-5 h-5 text-green-600" />
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-4 py-6">
          <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-semibold transition">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-30 sm:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen ml-0 sm:ml-56">
        {/* Mobile menu button */}
        <div className="sm:hidden flex items-center p-4 bg-white shadow sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-green-700" />
          </button>
          <span className="ml-4 text-lg font-bold text-green-700">AgriSmart</span>
        </div>

        {/* Welcome Header */}
        <div className="px-4 sm:px-8 pt-6 pb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-1 flex items-center gap-2">
            Welcome to AgriSmart <span className="text-3xl">👋</span>
          </h1>
          <div className="text-green-600 font-medium text-base mb-2">Empowering African Farmers through Technology</div>
          <div className="text-gray-700 text-lg font-semibold">{userName && `Hello, ${userName}`}</div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 sm:px-8 pb-8">
          {/* Left: Farm Summary Cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
                <Package className="w-8 h-8 text-green-700 mb-2" />
                <div className="text-2xl font-bold">{summary?.livestock ?? <Loader2 className="animate-spin w-5 h-5" />}</div>
                <div className="text-gray-600">Total Livestock</div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
                <Leaf className="w-8 h-8 text-green-700 mb-2" />
                <div className="text-2xl font-bold">{summary?.crops ?? <Loader2 className="animate-spin w-5 h-5" />}</div>
                <div className="text-gray-600">Crop Stock</div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
                <Tractor className="w-8 h-8 text-green-700 mb-2" />
                <div className="text-2xl font-bold">{summary?.equipment ?? <Loader2 className="animate-spin w-5 h-5" />}</div>
                <div className="text-gray-600">Equipment</div>
              </div>
            </div>

            {/* Today's Tasks Widget */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center mb-4">
                <ClipboardList className="w-6 h-6 text-green-700 mr-2" />
                <h2 className="text-lg font-bold">Today's Tasks</h2>
                <button 
                  onClick={() => setShowAddTaskModal(true)}
                  className="ml-auto bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm font-semibold transition"
                >
                  <PlusCircle className="w-4 h-4" /> Add Task
                </button>
              </div>
              {tasksLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="animate-spin w-6 h-6 text-green-600" />
                </div>
              ) : tasks.length === 0 ? (
                <div className="text-gray-500">No tasks for today.</div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {tasks.map((task) => (
                    <li key={task.id} className="py-2 flex items-center justify-between">
                      <span>{task.title || task.name}</span>
                      <span className="text-xs text-gray-400">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Market Sales Summary */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <Store className="w-8 h-8 text-green-700 mr-4" />
              <div>
                <div className="text-lg font-bold">Market Sales</div>
                {salesLoading ? (
                  <Loader2 className="animate-spin w-5 h-5 text-green-600" />
                ) : (
                  <div className="text-2xl">{sales?.count ?? 0} items sold/listed</div>
                )}
                <div className="text-gray-500 text-sm">(Feature coming soon!)</div>
              </div>
            </div>
          </div>

          {/* Right: AI Tips Card */}
          <div className="flex flex-col gap-6">
            <div className="bg-green-50 border-l-4 border-green-600 rounded-xl shadow p-6 flex items-center">
              <Sparkles className="w-8 h-8 text-green-700 mr-4" />
              <div>
                <div className="text-lg font-bold mb-2">AI Farm Tip</div>
                {aiTipLoading ? (
                  <Loader2 className="animate-spin w-5 h-5 text-green-600" />
                ) : (
                  <blockquote className="italic text-green-900">{aiTip}</blockquote>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Add New Task</h3>
              <button onClick={() => setShowAddTaskModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter task title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <div className="relative">
                  <input
                    type="text"
                    value={newTask.dueDate}
                    onClick={() => setShowDatePicker(true)}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                    placeholder="Select due date"
                  />
                  <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddTask}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-medium"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Select Due Date</h3>
              <button onClick={() => setShowDatePicker(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => handleDateSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                min={new Date().toISOString().split('T')[0]}
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleDateSelect(new Date().toISOString().split('T')[0])}
                  className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded text-sm font-medium"
                >
                  Today
                </button>
                <button
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    handleDateSelect(tomorrow.toISOString().split('T')[0]);
                  }}
                  className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded text-sm font-medium"
                >
                  Tomorrow
                </button>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              💡 Future: Email reminders will be sent for tasks with due dates
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
