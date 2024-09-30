import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useActionsStore } from '@/lib/store/actions-store';
import { FileSystemItem } from '@/types';
import { router } from '@inertiajs/react';
import { IconArrowLeft } from '@tabler/icons-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteEnd, InfiniteLoader } from '../infinite-scroll-helpers';
import { ListItem } from '../list/list-item';
import { NewFolderItem } from '../list/new-folder-item';
import { UpItem } from '../list/up-item';

type Props = {
    items: FileSystemItem[];
    loadMore: () => void;
    hasMore: boolean;
    upLink: string;
};

export const ListSection = ({ items, loadMore, hasMore, upLink }: Props) => {
    const { isCreatingFolder } = useActionsStore();
    return (
        <section>
            <InfiniteScroll
                dataLength={items.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<InfiniteLoader />}
                endMessage={<InfiniteEnd />}
            >
                <Table className="container">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Type</TableHead>
                            <TableHead className="w-96">Name</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead className="w-[50px] text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow
                            onClick={() => router.replace(upLink)}
                            className="cursor-pointer"
                        >
                            <TableCell>
                                <IconArrowLeft />
                            </TableCell>
                            <TableCell colSpan={3}>Go up</TableCell>
                        </TableRow>
                        {isCreatingFolder && <NewFolderItem />}
                        {items.map((item) => (
                            <ListItem key={item.id} item={item} />
                        ))}
                        {!hasMore && items.length > 50 && <UpItem />}
                    </TableBody>
                </Table>
            </InfiniteScroll>
        </section>
    );
};
