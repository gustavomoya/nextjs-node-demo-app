import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function SkeletonCard() {
    return (
        <Card className="w-ful">
            <CardHeader>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="aspect-video w-full" />
            </CardContent>
        </Card>
    )
}


export function SkeletonTable() {
    return (
        <div className="flex w-full flex-col gap-2 pt-5">
            {Array.from({ length: 5 }).map((_, index) => (
                <div className="flex gap-4" key={index}>
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                </div>
            ))}
        </div>
    )
}

export function SkeletonCardTable() {
    return (
        <div className="w-full mt-5">
            <Card className="w-full">
                <CardContent>
                    <SkeletonTable/>
                </CardContent>
            </Card>
        </div>
    )
}
