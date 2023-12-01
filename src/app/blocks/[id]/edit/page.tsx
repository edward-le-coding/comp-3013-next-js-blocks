import { db } from "@/db";
import { redirect } from "next/navigation";

export default async function editBlock({ params }: any) {
    const currentBlock = await db.block.findFirst({
        where:
        {
            id: {
                equals: parseInt(params.id)
            }
        }
    });

    async function editBlock(formData: FormData) {
        // Mark this function as a SERVER ACTION
        "use server"

        // Validate User Inputs ()

        // Get Form Data
        const title = formData.get("title") as string;
        const code = formData.get("code") as string;
        // Edit the data in the database using prisma
        await db.block.update({
            where: {
              id: parseInt(params.id),
            },
            data: {
              title: title,
              code: code,
            },
          });
    // Redirect the user back to the homepage
    redirect(`/blocks/${params.id}`)
}

return (
    <form action={editBlock}>
        <h3 className="font-bold m-3">Edit a Block</h3>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <label className="w-12" htmlFor="title">Title</label>
                <input name="title" id="title" className="border rounded p-2 w-full" defaultValue={currentBlock?.title} />
            </div>
            <div className="flex gap-4">
                <label className="w-12" htmlFor="code">Code</label>
                <textarea name="code" id="code" className="border rounded p-2 w-full" defaultValue={currentBlock?.code} />
            </div>
            <button className="rounded p-2 bg-blue-600 text-white hover:bg-blue-500" type="submit">
                Save
            </button>
        </div>
    </form>)

}