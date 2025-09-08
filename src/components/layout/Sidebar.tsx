"use client"

import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth";
import {useState} from "react";
import {Menu} from "lucide-react";

export function Sidebar() {
    const { user, isLoading, logout } = useAuth()
    const [open, setOpen] = useState(false)
    if (isLoading || !user) return null
    return (
        <>
            {/* Mobile toggle button */}
            <div className="md:hidden p-4 bg-card border-b flex justify-between items-center">
                <h2 className="text-lg font-bold text-[var(--color-foreground)]">Dashboard</h2>
                <Button
                    variant="ghost"
                    onClick={() => setOpen(!open)}
                    className="p-2"
                >
                    <Menu className="w-6 h-6" />
                </Button>
            </div>

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 w-64 bg-card h-screen border-r p-6
          transform transition-transform duration-200
          md:relative md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"} 
        `}
            >
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[var(--color-foreground)]">Dashboard</h2>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                </div>

                <div className="mt-6">
                    <Button onClick={logout} variant="secondary" className="w-full">
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Overlay for mobile when sidebar is open */}
            {open && <div className="fixed inset-0 bg-black/25 z-40 md:hidden" onClick={() => setOpen(false)} />}
        </>
  );
}
