
import StickyFooter from '#/components/ui/Footer';
import { cn } from '#/lib/utils';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import Sidebar from '#/components/navbar/Sidebar';
import Navbar from '#/components/navbar/Navbar';
import WhatsAppButton from '#/components/ui/WhatsAppButton';

export const Route = createFileRoute('/_user')({
  component: RouteComponent,
})

function RouteComponent() {

  const [open, setOpen] = useState(false);


  return (
    <div className='relative flex min-h-screen'>

      {/* Mobile overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[999] bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Desktop push-layout wrapper */}
      <div className={cn(`relative transition-all duration-500 ease-in-out overflow-hidden flex-1`, open ? "md:p-4 md:ps-0 p-0" : "p-0")}>
        <div className={cn('h-4 bg-white fixed top-0 left-0 w-full z-[1000]', open ? "hidden md:block" : "hidden")} />
        <div className={cn('h-4 bg-white fixed bottom-0 left-0 w-full z-[1000]', open ? "hidden md:block" : "hidden")} />

        <div className={cn('relative flex-1 transition-all duration-500 ease-in-out', open ? "md:rounded-2xl md:rounded-tl-none md:rounded-bl-none md:w-[90%] w-[100%]" : "rounded-none w-[100%]")}>
          <Navbar setOpen={setOpen} open={open} />

          <Outlet />
          <StickyFooter />
          <WhatsAppButton />
        </div>
      </div>

      {/* Desktop push sidebar column */}
      <div className={cn('hidden md:block bg-white transition-all duration-500 ease-in-out', open ? "md:w-[10%]" : "w-0")}>
        <AnimatePresence>
          {open && (
            <Sidebar setOpen={setOpen} />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile overlay sidebar */}
      <AnimatePresence>
        {open && (
          <div className="md:hidden">
            <Sidebar setOpen={setOpen} />
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
