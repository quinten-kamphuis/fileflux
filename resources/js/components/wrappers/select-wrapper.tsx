import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toSentenceCase } from '@/lib/utils';

type Props = {
    items: string[];
    placeholder?: string;
    className?: string;
    value?: string;
    defaultValue?: string;
    onValueChange: (value: string) => void;
};

export const SelectWrapper = ({
    items,
    placeholder,
    className,
    value,
    defaultValue,
    onValueChange,
}: Props) => {
    return (
        <Select
            value={value}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
        >
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item} value={item}>
                        {toSentenceCase(item)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
