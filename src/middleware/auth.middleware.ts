
import { authClient } from "#/lib/auth-client";
import { createIsomorphicFn, createMiddleware } from "@tanstack/react-start";
import { redirect } from '@tanstack/react-router'

export const getSession = createIsomorphicFn()
    .client(async () => {
        const { data } = await authClient.getSession();
        return data;
    })
    .server(async () => {
        const { auth } = await import("../lib/auth");
        const { getRequestHeaders } = await import("@tanstack/react-start/server");

        const headers = getRequestHeaders();

        return auth.api.getSession({ headers });
    });

export const requireAdmin = createMiddleware({ type: 'function' })
    .client(async ({ next }) => {
        const { data } = await authClient.getSession();
        const user = data?.user ?? null;
        const session = data?.session ?? null;
        console.log('user-', user)
        if (!data?.user || data?.user?.role !== 'admin') {
            throw new Error('Unauthorized')
        }
        return next({
            context: {
                user,
                session,
                isAdmin: true
            }
        })
    })
    .server(
        async ({ next }) => {
            const { auth } = await import("../lib/auth");
            const { getRequestHeaders } = await import("@tanstack/react-start/server");

            const headers = getRequestHeaders();
            const data = await auth.api.getSession({ headers });
            console.log('user-', data?.user)

            if (!data?.user || data?.user.role !== 'admin') {
                throw new Error('Unauthorized')

            }
            return next({
                context: {
                    user: data?.user,
                    session: data?.session,
                    isAdmin: true
                }
            })
        }
    )
