import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
  return (
    <div className="rounded-md border border-gray-800 bg-black">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800">
            <TableHead className="w-[100px]">
              <Skeleton className="h-4 w-[80px] bg-gray-800" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[100px] bg-gray-800" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-[100px] bg-gray-800" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="h-4 w-[80px] ml-auto bg-gray-800" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10)].map((_, index) => (
            <TableRow key={index} className="border-gray-800">
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-[80px] bg-gray-800" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px] bg-gray-800" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px] bg-gray-800" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-[80px] ml-auto bg-gray-800" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { LoadingSkeleton };
