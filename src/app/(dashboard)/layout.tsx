import {Sidebar} from "@/components/layout/Sidebar";
import type {Metadata} from "next";
export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dekamond Auth Task",
};
export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-muted)]">
            <Sidebar />
            <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
    );
}
