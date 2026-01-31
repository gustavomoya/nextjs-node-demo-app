import {API_URL, apiDelete, apiDownload, apiFetch} from "@/app/lib/api";
import {auth} from "@/auth";

export async function getFiles() {
    return  await apiFetch('/files', {
        method: "GET",
    });
}

export async function getFile(id: number) {
    return  await apiFetch(`/files/${id}`, {
        method: "GET",
    });
}
export async function createFile({filename, content, }: { filename: string; content: File; }) {
    const session = await auth();
    const token = session.accessToken ? session.accessToken : null;

    const formData = new FormData();
    formData.append("name", filename);
    formData.append("file", content);

    const res = await fetch(`${API_URL}/files`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Error en la API");
    }

    return res.json();
}

export async function putFile({id, filename, content, }: { id: number, filename: string; content?: File; }) {
    const session = await auth();
    const token = session.accessToken ? session.accessToken : null;

    const formData = new FormData();
    formData.append("name", filename);
    if (content.size) {
        console.log('cdsdsdsad', content)
        formData.append("file", content);
    } else {
        console.log('no content')
    }

    const res = await fetch(`${API_URL}/files/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "PUT",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Error en la API");
    }

    return res.json();
}

export async function removeFile(fileId: number) {
    const res = await apiDelete(`/files/${fileId}`);

    if (!res.ok && res.status !== 204) {
        throw new Error("Failed to delete file");
    }
}