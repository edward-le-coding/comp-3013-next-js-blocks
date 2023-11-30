import { db } from "@/db"
import Link from 'next/link';

export default async function Home() {
  const blocks = await db.block.findMany();
  const renderedBlocks = blocks.map((block) => (
    <Link key={block.id}
      href={`blocks/${block.id}`}
      className="flex justify-between items-center p-2 border rounded">

      <h2>{block.title}</h2>
      <div>View</div>
    </Link>
  ));

  return (
    <div>
      <div className='flex flex-col gap-2'>
        {renderedBlocks}
      </div>
    </div>
  )
}
