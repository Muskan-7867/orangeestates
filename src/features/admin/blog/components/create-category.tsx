import { Loader2, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { CreateCategorySFN } from '../server/blog.fn';
import toast from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '#/lib/query/query-constants';



export default function CreateCategory() {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreatingCategory(true);
        try {
            await CreateCategorySFN({ data: { name: newCategoryName } });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_CATEGORIES })
            setNewCategoryName('');
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Something went wrong");
            // optionally navigate
            navigate({ to: "/auth/login" });
        } finally {
            setIsCreatingCategory(false);
        }
    }
    return (
        <form
            onSubmit={handleCreateCategory}
            className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-2"
        >
            <label className="text-xs text-neutral-400 font-medium">Or Create New Category</label>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Design"
                    className="flex-1 text-xs bg-neutral-50 dark:bg-neutral-950/20 border border-neutral-200 dark:border-neutral-800 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-700 text-neutral-800 dark:text-neutral-200"
                />
                <button
                    type="submit"
                    disabled={isCreatingCategory || !newCategoryName.trim()}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-md text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-colors disabled:opacity-50"
                >
                    {isCreatingCategory ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                        <Plus className="h-3.5 w-3.5" />
                    )}
                </button>
            </div>
        </form>
    )
}