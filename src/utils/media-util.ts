

export type UploadResponse = {
    imageId: string,
    name: string,
    url: string,
    thumbhash: string,
    blurDataUrl: string,
}
export type UploadMultipleResponse = Array<{
    imageId: string,
    name: string,
    url: string,
    thumbhash: string,
    blurDataUrl: string,
}>

export type UploadSingleVideoResponse = {
    videoId: string,
    name: string,
    url: string,
    videoThumbnail: string,
    thumbhash: string,
    blurDataUrl: string,
}

export const uploadSingleImage = async (
    file: File,
    project: string
): Promise<UploadResponse> => {
    if (!file) {
        throw new Error("File is required")
    }
    if (!project) {
        throw new Error("Project Name is required")
    }
    const formData = new FormData()
    formData.append("file", file)
    formData.append("project", project)

    try {
        const response = await fetch(
            `https://cdn.omenterprisesgroup.in/api/media/upload/single/image`,
            {
                method: "POST",
                headers: {
                    "x-upload-secret": '85ae703357d54409b07f81ab6ea1c8b4'
                },
                body: formData
            }
        )

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || "Image upload failed")
        }

        const responseJson = await response.json()
        return responseJson.data
    } catch (error) {
        throw new Error(error as string)
    }
}

export const uploadMultipleImages = async (
    files: File[],
    project: string
): Promise<UploadMultipleResponse> => {

    if (!files) {
        throw new Error("File is required")
    }
    if (!project) {
        throw new Error("Project Name is required")
    }

    const formData = new FormData()
    files.forEach((file) => formData.append("files", file))
    formData.append("project", project)


    try {
        const response = await fetch(
            `${process.env.MEDIA_SERVICE_URL}/media/upload/multiple/images`,
            {
                method: "POST",
                headers: {
                    "x-upload-secret": process.env.MEDIA_UPLOAD_SECRET!
                },
                body: formData
            }
        )

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || "Image upload failed")
        }

        const responseJson = await response.json()
        return responseJson.data
    } catch (error) {
        throw new Error(error as string)
    }

}

export const uploadSingleVideo = async (
    file: File,
    project: string
): Promise<UploadSingleVideoResponse> => {
    if (!file) {
        throw new Error("File is required")
    }
    if (!project) {
        throw new Error("Project Name is required")
    }
    const formData = new FormData()
    formData.append("file", file)
    formData.append("project", project)

    try {
        const response = await fetch(
            `${process.env.MEDIA_SERVICE_URL}/media/upload/single/video`,
            {
                method: "POST",
                headers: {
                    "x-upload-secret": process.env.MEDIA_UPLOAD_SECRET!
                },
                body: formData
            }
        )

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || "Video upload failed")
        }

        const responseJson = await response.json()
        return responseJson.data
    } catch (error) {
        throw new Error(error as string)
    }
}