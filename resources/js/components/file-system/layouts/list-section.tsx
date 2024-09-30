import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { FileSystemItem } from '@/types';
import { Link, router } from '@inertiajs/react';
import { IconArrowLeft, IconFile, IconFolder } from '@tabler/icons-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteEnd, InfiniteLoader } from '../infinite-scroll-helpers';
import UpItem from '../list/up-item';

type Props = {
    items: FileSystemItem[];
    loadMore: () => void;
    hasMore: boolean;
    upLink: string;
};

export const ListSection = ({ items, loadMore, hasMore, upLink }: Props) => {
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
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead className="text-right">
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
                        {items.map((item) => {
                            return item.type === 'folder' ? (
                                <TableRow
                                    key={item.id}
                                    onClick={() =>
                                        router.replace(item.links.self)
                                    }
                                    className="cursor-pointer"
                                >
                                    <TableCell>
                                        <IconFolder />
                                        <span className="sr-only">Folder</span>
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.createdAt}</TableCell>
                                    <TableCell className="text-right">
                                        <Link
                                            href={item.links.delete ?? '#'}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <IconFile />
                                        <span className="sr-only">File</span>
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.createdAt}</TableCell>
                                    <TableCell className="text-right">
                                        <Link
                                            href={item.links.delete ?? '#'}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {!hasMore && <UpItem />}
                    </TableBody>
                </Table>
            </InfiniteScroll>
        </section>
    );
};
