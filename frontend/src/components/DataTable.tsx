import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
} from "./ui/table";

interface DataItem {
  id: number;
  name: string;
  file_type: string;
  file_size: number;
  file_size_mb: number;
  uploaded_at: string;
}

interface DataTableProps {
  data: DataItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const DataTable = ({ data, status }: DataTableProps) => {
  return (
    <div className="flex flex-col flex-1 h-full overflow-auto">
      <Table className="min-w-full border-black border-solid divide-y divide-gray-200 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w1/4">File Name</TableHead>
            <TableHead className="w1/4">File Type</TableHead>
            <TableHead className="w1/4">File Size</TableHead>
            <TableHead className="w1/4">Upload Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {status === "loading" ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Fetching Data...
              </TableCell>
            </TableRow>
          ) : status === "failed" ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                There was a problem fetching the data
              </TableCell>
            </TableRow>
          ) : data && data.length >= 1 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.file_type}</TableCell>
                <TableCell>{item.file_size_mb}mb</TableCell>
                <TableCell>{item.uploaded_at}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="rounded-md">
          <TableRow>
            <TableCell colSpan={4}>
              Total CSV's Uploaded: {data ? data.length : 0}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default DataTable;
