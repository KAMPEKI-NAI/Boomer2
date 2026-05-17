import Followbar from "./layout/Followbar";
import Sidebar from "./layout/Sidebar";


interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) =>{
    return(
        <div className= "min-h-screen bg-black">
            <div className="container min-h-screen mx-auto xl:px-30 max-w-6xl">
                <div className="grid grid-cols-4 min-h-screen">

                    <Sidebar/>
                    <div className="
                    col-span-3
                    lg:col-span-2
                    border-x-[1px]
                    border-neutral-800">
                        {children}
                    </div>
                    <Followbar/>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default Layout;
