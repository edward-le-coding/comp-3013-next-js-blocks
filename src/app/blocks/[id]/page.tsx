import { db } from "@/db"
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function BlockShowPage({ params }: any) {
    const currentBlock = await db.block.findFirst({
        where:
        {
            id: {
                equals: parseInt(params.id)
            }
        }
    });

    async function deleteCurrentBlock(formData: FormData) {
        "use server"
        await db.block.delete({
            where:
            {
                id: parseInt(params.id)
            }
        });
        redirect("/");
    }

    return (
        <div className="flex-col h-screen p-4">
            <div className="flex justify-between items-center p-2 border rounded">
                <h1>{currentBlock?.title}</h1>
                <div className="flex justify-between p-2 gap-1">
                    <Link key={params.id}
                        href={`/blocks/${params.id}/edit`}>
                        <div className="flex justify-between items-center p-2 border rounded">Edit</div>
                    </Link>
                    <form action={deleteCurrentBlock}>
                        <button className="flex justify-between items-center p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>
            <h2 className="p-4">Code:</h2>
            <div className="border rounded h-1/2 p-4">
                {currentBlock?.code}
            </div>
        </div>
    );
}