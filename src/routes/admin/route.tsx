import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getSession } from '#/middleware/auth.middleware'


export const Route = createFileRoute('/admin')({
    beforeLoad: async () => {
        const sessionData = await getSession();
        if (!sessionData?.user || sessionData.user.role !== 'admin') {
            throw redirect({
                to: '/'
            })
        }
    },
    component: RouteComponent,
    ssr: false
})

function RouteComponent() {


    return (
        <div className=''>
            <Outlet />

        </div>
    )

}

