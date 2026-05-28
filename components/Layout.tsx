import Followbar from "./layout/Followbar";
import MobileNavigation from "./layout/MobileNavigation";
import Sidebar from "./layout/Sidebar";


interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) =>{
    return(
        <div className= "min-h-screen bg-black pb-16 md:pb-0">
            <div className="container min-h-screen mx-auto max-w-6xl xl:px-30">
                <div className="grid min-h-screen grid-cols-1 md:grid-cols-4">

                    <Sidebar/>
                    <div className="
                    col-span-1
                    md:col-span-3
                    lg:col-span-2
                    md:border-x-[1px]
                    border-neutral-800">
                        {children}
                    </div>
                    <Followbar/>
                </div>
            </div>
            <MobileNavigation />
        </div>
    );
}

export default Layout;
