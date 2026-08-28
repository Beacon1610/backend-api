import Skeleton from '../ui/Skeleton';

export default function LoadingChart() {
  return (
    <div className="flex h-72 flex-col justify-end gap-3">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}
