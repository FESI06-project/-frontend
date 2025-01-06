import Navigation from './Navigation';
import SideBar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <SideBar />
      <Navigation />
      <main>{children}</main>
    </div>
  );
}
