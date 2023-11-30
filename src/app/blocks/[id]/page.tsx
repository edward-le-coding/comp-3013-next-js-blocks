import { db } from "@/db"
export default async function BlockShowPage({ params }: any) {
    const currentBlock = await db.block.findFirst({
        where:
        {
            id: {
                equals: parseInt(params.id)
            }
        }
    });
    return (
        <div>
            <h1>{currentBlock?.title}</h1>
            <p>{currentBlock?.code}</p>
        </div>
    );
}