import Navbar, { navLinks } from '#/components/Navbar';
import StickyFooter from '#/components/ui/Footer';
import { cn } from '#/lib/utils';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from '@tanstack/react-router';
import { X } from 'lucide-react';
import Sidebar from '#/components/Sidebar';

export const Route = createFileRoute('/_user')({
  component: RouteComponent,
})

function RouteComponent() {

  const [open, setOpen] = useState(false);


  return <div className='flex'>
    <div className={cn(`transition-all duration-500 ease-in-out overflow-hidden flex-1 `, open ? "p-4 ps-0" : "p-0")}>


      <div className={cn('relative flex-1  transition-all duration-500 ease-in-out overflow-hidden', open ? "rounded-2xl rounded-tl-none rounded-bl-none w-[60%] md:w-[90%]" : "rounded-none w-[100%]")}>
        <Navbar setOpen={setOpen} open={open} />
        <Outlet />
        <StickyFooter />
      </div>

    </div>
    <div className={cn('bg-white w-120 transition-all duration-500 ease-in-out', open ? "md:w-[10%] w-[40%]" : "w-0")}>

      <AnimatePresence>
        {open && (
          <Sidebar setOpen={setOpen} />
        )}
      </AnimatePresence>
    </div>
  </div>
}
