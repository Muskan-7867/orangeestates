
import StickyFooter from '#/components/ui/Footer';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useState } from 'react';

import Navbar from '#/components/navbar/Navbar';
import WhatsAppButton from '#/components/ui/WhatsAppButton';

export const Route = createFileRoute('/_user')({
  component: RouteComponent,
})

function RouteComponent() {

  const [open, setOpen] = useState(false);


  return (
    <div className='relative  min-h-screen'>

      <Navbar setOpen={setOpen} open={open} />

      <Outlet />
      <StickyFooter />
      <WhatsAppButton />
    </div>





  )
}
