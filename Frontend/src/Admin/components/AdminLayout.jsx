import React from 'react';
import {
  LayoutDashboard,
  Shirt,
  Tags,
  ShoppingCart,
  Users,
  Warehouse,
  Layout,
  Percent,
  LineChart,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Bell,
  Sparkles,
  CheckCircle,
  Play,
  UserCheck
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Shirt },
  { id: 'categories', label: 'Categories', icon: Tags },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'campaigns', label: 'Campaigns', icon: Layout },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'inventory', label: 'Inventory', icon: Warehouse },
  // { id: 'cms', label: 'CMS Control', icon: Layout },
  { id: 'coupons', label: 'Coupons', icon: Percent },
  { id: 'analytics', label: 'Analytics', icon: LineChart },
  { id: 'settings', label: 'Settings', icon: SettingsIcon }
];

function AdminSidebar({
  sidebarCollapsed,
  currentTab,
  onToggleSidebar,
  onSelectTab,
  onSimulateSale
}) {
  return (
    <aside
      className={`bg-slate-900 text-slate-200 border-r border-slate-900 transition-all duration-300 flex flex-col justify-between shrink-0 select-none z-20 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}
      id="admin-sidebar"
    >
      <div className="flex flex-col">
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          {!sidebarCollapsed && (
            <span className="font-black text-sm uppercase tracking-widest text-white flex items-center gap-2">
              HAIERAH Admin <Sparkles className="w-4.5 h-4.5 text-amber-500" />
            </span>
          )}
          <button
            onClick={onToggleSidebar}
            className="p-1 rounded-lg hover:bg-slate-800 bg-slate-800 text-slate-400 hover:text-white mx-auto focus:outline-none"
            title="Toggle Sidebar size"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <div className="px-3 pt-3 pb-2">
          {!sidebarCollapsed && (
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Main Navigation</p>
          )}
        </div>

        <nav className="p-3 space-y-1 relative">
          {navItems.map((item) => {
            const active = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all focus:outline-none ${
                  active
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                id={`nav-link-${item.id}`}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 space-y-3.5 bg-slate-950/40">
        {!sidebarCollapsed ? (
          <div className="space-y-2">
            <span className="text-[9px] uppercase font-black text-slate-500 block text-left">Operations</span>
            <button
              onClick={onSimulateSale}
              className="w-full bg-emerald-600/15 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-600/25 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-tight transition-all flex items-center justify-center gap-1.5 focus:outline-none"
              title="Random purchase simulator to verify reactive flows"
            >
              <Play className="w-3.5 h-3.5 animate-pulse text-emerald-400 fill-emerald-400/20" />
              Simulate Sale
            </button>
          </div>
        ) : (
          <button
            onClick={onSimulateSale}
            className="p-2 border border-emerald-500/30 rounded-full bg-emerald-600/10 text-emerald-400 mx-auto block hover:bg-emerald-600/20 focus:outline-none"
            title="Simulate Purchase"
          >
            <Play className="w-4 h-4 animate-pulse fill-emerald-400" />
          </button>
        )}

        <div className="flex items-center gap-2 px-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />
          {!sidebarCollapsed && (
            <span className="text-[10px] text-slate-500 font-mono font-bold">DB ACTIVE STORAGE</span>
          )}
        </div>
      </div>
    </aside>
  );
}

function AdminHeader({
  currentTab,
  notifications,
  showNotifDrawer,
  onToggleNotifications,
  onMarkNotificationsRead
}) {
  return (
    <header className="h-16 px-6 border-b border-slate-100 bg-white dark:bg-slate-900 flex justify-between items-center sticky top-0 z-10 w-full shrink-0 select-none">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50/50 px-3 py-1.5 rounded-lg">
        <span> HAIERAH Applet</span>
        <span className="text-slate-300">&bull;</span>
        <span className="text-slate-900 dark:text-slate-100">{currentTab} module</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={onToggleNotifications}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 border relative dark:border-slate-800 focus:outline-none"
            title="Simulation alerts logs"
          >
            <Bell className="w-4.5 h-4.5" />
            {notifications.some((n) => !n.read) && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-600 rounded-full border border-white"></span>
            )}
          </button>

          {showNotifDrawer && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 p-4 text-left font-sans animate-fade-in">
              <div className="flex justify-between items-center pb-2 border-b dark:border-slate-850 mb-2">
                <span className="text-xs font-bold uppercase text-slate-400">Active Sales Feeds</span>
                <button
                  onClick={onMarkNotificationsRead}
                  className="text-[10px] hover:underline text-slate-600 dark:text-slate-450 font-bold"
                >
                  Clear All Unreads
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
                {notifications.length === 0 ? (
                  <p className="text-[11px] text-slate-400 text-center py-4">No alerts received yet.</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2 rounded text-[11px] border border-slate-50 dark:border-slate-850 ${
                        n.read ? 'bg-white dark:bg-slate-900 opacity-70' : 'bg-slate-50 dark:bg-slate-950 font-bold'
                      }`}
                    >
                      <p className="text-slate-800 dark:text-slate-200 leading-tight">{n.text}</p>
                      <span className="text-[9px] text-slate-400 block mt-1">{n.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <span className="h-5 w-px bg-slate-200 dark:bg-slate-800"></span>

        <div className="flex items-center gap-2 px-1 py-1 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-lg max-w-[190px]">
          <div className="w-7 h-7 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center font-black text-xs">
            Z
          </div>
          <div className="text-left hidden md:block">
            <span className="font-bold text-[10.5px] leading-tight block truncate dark:text-white">Z. Morrison</span>
            <span className="text-[9px] text-slate-400 tracking-wider block">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function AdminFooter() {
  return (
    <footer className="h-10 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 flex items-center justify-between px-6 text-[10.5px] text-slate-400 select-none">
      <div className="flex items-center gap-1.5 font-bold">
        <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>Storefront Sandbox Active</span>
      </div>
      <span>HAIERAH Clothing Admin Panel &bull; Rev 2026</span>
    </footer>
  );
}

function ToastNotification({ toast }) {
  return (
    <div className="fixed bottom-6 right-6 bg-slate-900 dark:bg-white border border-slate-800 dark:border-slate-200 p-4 rounded-xl shadow-2xl text-white dark:text-slate-900 z-50 text-xs font-medium max-w-sm flex items-center gap-3 animate-slide-left hover:scale-[1.01] transition-transform">
      <div className="p-2 bg-emerald-600 rounded-lg text-white">
        <CheckCircle className="w-5 h-5 text-white" />
      </div>
      <div className="text-left">
        <span className="text-[10px] uppercase font-bold text-emerald-400 dark:text-emerald-600 tracking-wider">Checkout Event Received</span>
        <p className="text-slate-100 dark:text-slate-800 text-[11px] leading-snug mt-0.5">{toast.text}</p>
      </div>
    </div>
  );
}

export function AdminLayout({
  currentTab,
  sidebarCollapsed,
  onToggleSidebar,
  onSelectTab,
  onSimulateSale,
  notifications,
  showNotifDrawer,
  onToggleNotifications,
  onMarkNotificationsRead,
  viewContent,
  toast
}) {
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex relative" id="master-admin-root">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        currentTab={currentTab}
        onToggleSidebar={onToggleSidebar}
        onSelectTab={onSelectTab}
        onSimulateSale={onSimulateSale}
      />

      <main className="flex-grow flex flex-col justify-between overflow-x-hidden min-h-screen">
        <AdminHeader
          currentTab={currentTab}
          notifications={notifications}
          showNotifDrawer={showNotifDrawer}
          onToggleNotifications={onToggleNotifications}
          onMarkNotificationsRead={onMarkNotificationsRead}
        />

        <section className="flex-grow p-6 lg:p-8 overflow-y-auto w-full bg-slate-50/20">
          {viewContent}
        </section>

        <AdminFooter />
      </main>

      {toast && <ToastNotification toast={toast} />}
    </div>
  );
}
