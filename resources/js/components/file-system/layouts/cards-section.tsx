import { FileSystemItem } from '@/types';
import axios from 'axios';
import { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FileCard } from '../cards/file-card';
import { FolderCard } from '../cards/folder-card';
import { UpCard } from '../cards/up-card';
import { InfiniteEnd, InfiniteLoader } from '../infinite-scroll-helpers';

type Props = {
    upLink: string;
    initialItems: FileSystemItem[];
    initialNextCursor: string | null;
};

export const CardsSection = ({
    upLink,
    initialItems,
    initialNextCursor,
}: Props) => {
    const [itemsList, setItemsList] = useState(initialItems);
    const [nextCursor, setNextCursor] = useState(initialNextCursor);
    const [hasMore, setHasMore] = useState(!!nextCursor);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = useCallback(() => {
        if (!nextCursor || isLoading) return;

        setIsLoading(true);
        axios
            .get(route(route().current() ?? '', route().params), {
                params: { cursor: nextCursor },
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
            .then((response) => {
                setItemsList((prevItems) => [
                    ...prevItems,
                    ...response.data.items,
                ]);
                setNextCursor(response.data.nextCursor);
                setHasMore(!!response.data.nextCursor);
            })
            .catch((error) => {
                console.error('Error loading more items', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [nextCursor, isLoading]);

    return (
        <section>
            <InfiniteScroll
                dataLength={itemsList.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<InfiniteLoader />}
                endMessage={<InfiniteEnd />}
            >
                <div className="container grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
                    <UpCard link={upLink} />
                    {itemsList.map((item) => {
                        return item.type === 'folder' ? (
                            <FolderCard key={item.id} item={item} />
                        ) : (
                            <FileCard key={item.id} item={item} />
                        );
                    })}
                </div>
            </InfiniteScroll>
        </section>
    );
};
