import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div className='h-screen w-full  flex justify-center items-center px-4 '>
        <div className='w-lg'>
            <Outlet />
        </div>
    </div>
}
