import { AlertCircle } from "lucide-react";

function Error({ message }: { message: string | undefined }) {
  return (
    <div className="rounded-md border border-gray-800 bg-black p-6 text-center">
      <div className="flex flex-col items-center space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <div className="text-xl font-semibold text-gray-200">Error Loading Data</div>
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  );
}

export { Error };
