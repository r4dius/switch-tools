import clsx from 'clsx';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import * as Label from '@radix-ui/react-label';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useRef, useState } from 'react';

interface InputProps
	extends Omit<React.ComponentPropsWithoutRef<'input'>, 'placeholder'> {
	name: string;
	label: React.ReactNode;
	tooltip: React.ReactNode;
	placeholder: React.ReactNode;
}

export const Input = ({
	name,
	label,
	type,
	tooltip,
	placeholder,
	...props
}: InputProps) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [fileName, setFileName] = useState<string | undefined>();
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const input =
		type === 'file' ? (
			<>
				<label
					htmlFor={name}
					className={clsx(
						'Input',
						fileName && 'selected',
						isFocused && 'focused'
					)}
					style={{ padding: 0, position: 'relative' }}
				>
					<div>
						<span>{fileName ?? placeholder}</span>
					</div>
					<input
						type="file"
						name={name}
						id={name}
						{...props}
						style={{
							opacity: 0,
							position: 'absolute',
							width: '100%',
							height: '100%',
							cursor: 'pointer',
						}}
						ref={(ref) => {
							if (ref && fileInputRef.current !== ref) {
								setFileName(ref.files?.[0]?.name);
							}
						}}
						onChange={(e) => {
							setFileName(e.currentTarget.files?.[0]?.name);
						}}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
					/>
				</label>
			</>
		) : (
			<input
				className="Input"
				type="text"
				name={name}
				id={name}
				placeholder={
					typeof placeholder === 'string' ? placeholder : undefined
				}
				{...props}
			/>
		);
	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				flexWrap: 'wrap',
				padding: '10px 0',
				gap: 8,
			}}
		>
			<Label.Root className="LabelRoot" htmlFor={name}>
				{label}
				{': '}
			</Label.Root>
			{input}
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<Label.Root className="LabelRoot" htmlFor={name}>
							<InfoCircledIcon />
						</Label.Root>
					</Tooltip.Trigger>
					<Tooltip.Portal>
						<Tooltip.Content
							className="TooltipContent"
							sideOffset={5}
						>
							{tooltip}
							<Tooltip.Arrow className="TooltipArrow" />
						</Tooltip.Content>
					</Tooltip.Portal>
				</Tooltip.Root>
			</Tooltip.Provider>
		</div>
	);
};
