import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'

function LoadingTable({rows=5}:{rows?:number}) {
    const tableRows=Array.from({length:rows},(_,i)=>{
        return (
        <div className='m-4 ' key={i}>
            <Skeleton className='w-full h-8 rounded'>

            </Skeleton>
        </div>
    )
    })
  return (
    <div>
        {tableRows}
      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3}>
              <Skeleton className="h-10 w-full" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
    </div>
  )
}

export default LoadingTable
