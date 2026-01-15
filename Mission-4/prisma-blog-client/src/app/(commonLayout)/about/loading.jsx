export default function AboutLoading() {
  return (
    <div className="flex flex-col space-y-4 p-6">
      <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded-md"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded-md"></div>
      </div>
    </div>
  );
}
