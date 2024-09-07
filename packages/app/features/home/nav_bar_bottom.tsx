import { type ReactNode, cloneElement } from 'react'

import {
	Nav,
	Button as TamaguiButton,
	Text,
	Tooltip,
	XStack,
	styled,
	withStaticProperties,
} from '@my/ui'

interface CoNavBarBottomProps {
	children: ReactNode
}
interface CoNavBarBottomIcon {
	icon: React.ReactElement
	onPress: () => void
	tooltip: string
	selected?: boolean
}

/**
 * Main container for the bottom navigation bar
 */
const CoNavBarBottomContainer: React.FC<CoNavBarBottomProps> = ({
	children,
	...props
}) => {
	return (
		<Nav
			{...props}
			bottom={0}
			left={0}
			right={0}
			position='absolute'
			// w="100%"
			opacity={0.95}
			zIndex={1000}
		>
			<XStack alignItems='center' gap='$2' justifyContent='center'>
				{children}
			</XStack>
		</Nav>
	)
}

/**
 * Container for a group
 */
const CoNavBarBottomGroup = styled(XStack, {
	name: 'CoNavBarBottomGroup',

	background: '$orange5',
	borderTopStartRadius: '$8',
	borderTopEndRadius: '$8',
	gap: '$2',
	padding: '$1.5',
})

/**
 * Item part of a group
 */
const CoNavBarBottomGroupItem = ({
	icon,
	onPress,
	tooltip,
	selected,
}: CoNavBarBottomIcon) => {
	return (
		<Tooltip placement='top'>
			<Tooltip.Trigger>
				<CoNavBarGroupButton selected={selected ?? false} onPress={onPress}>
					<TamaguiButton.Icon>
						{cloneElement(icon, {
							size: 24,
						})}
					</TamaguiButton.Icon>
				</CoNavBarGroupButton>
			</Tooltip.Trigger>
			<Tooltip.Content
				// animation={[
				// 	'fast',
				// 	// {
				// 	// 	opacity: {
				// 	// 		overshootClamping: true,
				// 	// 	},
				// 	// },
				// ]}
				animation='tooltip'
				enterStyle={{ x: 0, y: 5, opacity: 0, scale: 0.9 }}
				exitStyle={{ x: 0, y: 5, opacity: 0, scale: 0.9 }}
				opacity={1}
				scale={1}
				x={0}
				y={0}
			>
				<Tooltip.Arrow />
				<Text color="$onSurface" fontSize={12}>
					{tooltip}
				</Text>
			</Tooltip.Content>
		</Tooltip>
	)
}
const CoNavBarGroupButton = styled(TamaguiButton, {
	name: 'CoNavBarGroupButton',

	size: 46,

	variants: {
		selected: {
			false: {
				bc: 'transparent',
				color: '$onSurface',
				hoverStyle: { bc: '$surfaceContainerLow' },
				pressStyle: { bc: '$surfaceContainerLowest' },
			},
			true: {
				bc: '$surfaceContainerLowest',
				color: '$primary',
				hoverStyle: { bc: '$surfaceContainerLow' },
				pressStyle: { bc: '$surfaceContainerLowest' },
			},
		},
	} as const,
	defaultVariants: {
		selected: false,
	},
})

/**
 * Independent item
 */
const CoNavBarBottomItem = ({ icon, tooltip }: CoNavBarBottomIcon) => {
	return (
		// <Tooltip bc="$surfaceContainerHigh" placement="top">
		<Tooltip placement='top'>
			<Tooltip.Trigger asChild>
				<TamaguiButton
					circular
					size={46}
					backgroundColor='$primary'
					color='$onPrimary'
					hoverStyle={{
						backgroundColor: '$primary',
						opacity: 0.88,
					}}
					pressStyle={{
						backgroundColor: '$primary',
						opacity: 0.76,
					}}
				>
					{cloneElement(icon, { size: 24 })}
				</TamaguiButton>
			</Tooltip.Trigger>
			<Tooltip.Content
				enterStyle={{ x: 0, y: 5, opacity: 0, scale: 0.9 }}
				exitStyle={{ x: 0, y: 5, opacity: 0, scale: 0.9 }}
				scale={1}
				x={0}
				y={0}
				opacity={1}
			>
				<Tooltip.Arrow />
				<Text color='$onSurface' fontSize={12}>
					{tooltip}
				</Text>
			</Tooltip.Content>
		</Tooltip>
	)
}

export const CoNavBarBottom = withStaticProperties(CoNavBarBottomContainer, {
	/**
	 * Group container
	 */
	Group: CoNavBarBottomGroup,
	/**
	 * Item part of the group
	 */
	GroupItem: CoNavBarBottomGroupItem,
	/**
	 * Independent of the groups
	 */
	Item: CoNavBarBottomItem,
})
