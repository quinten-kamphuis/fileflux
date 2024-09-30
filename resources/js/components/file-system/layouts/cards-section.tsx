import { useFiltersStore } from '@/lib/store/filters-store';
import { FileSystemItem } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FileCard } from '../cards/file-card';
import { FolderCard } from '../cards/folder-card';
import { UpCard } from '../cards/up-card';
import { InfiniteEnd, InfiniteLoader } from '../infinite-scroll-helpers';
import { CardsGrid } from './cards-grid';

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

    const { searchValue, itemType } = useFiltersStore();

    const fetchItems = useCallback(
        (cursor: string | null = null) => {
            setIsLoading(true);
            axios
                .get(route(route().current() ?? '', route().params), {
                    params: {
                        cursor: cursor,
                        search: searchValue,
                        item_type: itemType,
                    },
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                })
                .then((response) => {
                    if (cursor) {
                        setItemsList((prevItems) => [
                            ...prevItems,
                            ...response.data.items,
                        ]);
                    } else {
                        setItemsList(response.data.items);
                    }
                    setNextCursor(response.data.nextCursor);
                    setHasMore(!!response.data.nextCursor);
                })
                .catch((error) => {
                    console.error('Error loading items', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [searchValue, itemType],
    );

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const loadMore = useCallback(() => {
        if (!nextCursor || isLoading) return;
        fetchItems(nextCursor);
    }, [nextCursor, isLoading, fetchItems]);

    const filteredItems = itemsList.filter((item) => {
        if (itemType === 'folders' && item.type !== 'folder') return false;
        if (itemType === 'files' && item.type === 'folder') return false;
        if (
            searchValue &&
            !item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
            return false;
        return true;
    });

    return (
        <section>
            <InfiniteScroll
                dataLength={filteredItems.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<InfiniteLoader />}
                endMessage={<InfiniteEnd />}
            >
                <CardsGrid>
                    <UpCard link={upLink} />
                    {filteredItems.map((item) => {
                        return item.type === 'folder' ? (
                            <FolderCard key={item.id} item={item} />
                        ) : (
                            <FileCard key={item.id} item={item} />
                        );
                    })}
                </CardsGrid>
            </InfiniteScroll>
        </section>
    );
};
