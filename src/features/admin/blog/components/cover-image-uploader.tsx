import { ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { useBlogStore } from "../store/blog-store";



export default function CoverImageUploader() {
    const [isUploadingCover, setIsUploadingCover,] = useState(false)
    const { coverImage, actions } = useBlogStore();

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploadingCover(true)
        const formData = new FormData()
        formData.append('image', file)

        try {
            // const { url } = await uploadSingleImage(file, env.MEDIA_UPLOAD_PROJECT_NAME)
            const url = URL.createObjectURL(file);

            actions.setCoverImage(url);
            actions.setCoverImageFile(file);

        } catch (err: any) {
            console.log(err)

        } finally {
            setIsUploadingCover(false)
        }

    }

    return (
        <div className="bg-white dark:bg-neutral-900/60 p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4 text-neutral-400" /> Cover Image
            </h2>

            {coverImage ? (
                <div className="relative group rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                    <img src={coverImage} alt="Cover preview" className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <label className="cursor-pointer bg-white/95 text-neutral-800 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-white flex items-center gap-1.5 shadow-sm transition-colors">
                            <Upload className="h-3.5 w-3.5" />
                            Change
                            <input
                                type="file"
                                onChange={handleCoverUpload}
                                accept="image/*"
                                className="hidden"
                            />
                        </label>
                        <button
                            onClick={() => actions.setCoverImage('')}
                            className="bg-rose-600 text-white p-1.5 rounded-md hover:bg-rose-700 transition-colors shadow-sm"
                            title="Remove cover"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            ) : (
                <label className="border-2 border-dashed border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-neutral-400 dark:text-neutral-500 hover:text-neutral-600">
                    {isUploadingCover ? (
                        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                    ) : (
                        <Upload className="h-8 w-8 text-neutral-300 dark:text-neutral-700" />
                    )}
                    <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                        {isUploadingCover ? 'Uploading...' : 'Upload cover image'}
                    </span>
                    <span className="text-[10px] opacity-75">PNG, JPG, WEBP up to 5MB</span>
                    <input
                        type="file"
                        onChange={handleCoverUpload}
                        accept="image/*"
                        className="hidden"
                        disabled={isUploadingCover}
                    />
                </label>
            )}
        </div>
    )
}