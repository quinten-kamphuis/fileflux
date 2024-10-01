import { useActionsStore } from '@/lib/store/actions-store';
import { useFiltersStore } from '@/lib/store/filters-store';
import { useLayoutStore } from '@/lib/store/layout-store';
import { FileSystemItem } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { CardsSection } from './layouts/cards-section';
import { ListSection } from './layouts/list-section';

type Props = {
    upLink: string;
    initialItems: FileSystemItem[];
    initialNextCursor: string | null;
};

export const FileSystem = ({
    upLink,
    initialItems,
    initialNextCursor,
}: Props) => {
    const [itemsList, setItemsList] = useState(initialItems);
    const [nextCursor, setNextCursor] = useState(initialNextCursor);
    const [hasMore, setHasMore] = useState(!!nextCursor);
    const [isLoading, setIsLoading] = useState(false);

    const { searchValue, itemType } = useFiltersStore();

    const { cancelCreateFolder } = useActionsStore();

    const { layout } = useLayoutStore();

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
        return () => {
            setItemsList(initialItems);
            cancelCreateFolder();
        };
    }, [fetchItems, initialItems, cancelCreateFolder]);

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

    if (layout === 'list') {
        return (
            <ListSection
                items={filteredItems}
                loadMore={loadMore}
                hasMore={hasMore}
                upLink={upLink}
            />
        );
    } else if (layout === 'grid') {
        return (
            <CardsSection
                items={filteredItems}
                loadMore={loadMore}
                hasMore={hasMore}
                upLink={upLink}
            />
        );
    }
};
