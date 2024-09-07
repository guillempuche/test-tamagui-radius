import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  XStack,
  YStack,
  useToastController,
} from '@my/ui'
import { ChevronLeft, ChevronRight, PlusCircle } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import { CoNavBarBottom } from './nav_bar_bottom' // Import the nav_bar_bottom component

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const linkTarget = pagesMode ? '/pages-example-user' : '/user'
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  })

  return (
    <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
      <XStack
        pos="absolute"
        w="100%"
        t="$6"
        gap="$6"
        jc="center"
        fw="wrap"
        $sm={{ pos: 'relative', t: 0 }}
      >
        {Platform.OS === 'web' && (
          <>
            <Button {...linkProps}>Link to user</Button>
          </>
        )}
      </XStack>

      <YStack gap="$4">
        <H1 ta="center" col="$color12">
          Welcome to Tamagui.
        </H1>
        <Paragraph col="$color10" ta="center">
          Here's a basic starter to show navigating from one screen to another.
        </Paragraph>
        <Separator />
        <Paragraph ta="center">
          This screen uses the same code on Next.js and React Native.
        </Paragraph>
        <Separator />
      </YStack>

      {/* Include the nav bar demo */}
      <DemoBottomNav />
    </YStack>
  )
}

// DemoBottomNav Component using CoNavBarBottom
function DemoBottomNav() {
  const handleCreate = () => alert('Create button pressed')
  const handleLibrary = () => alert('Library button pressed')
  const handleSettings = () => alert('Settings button pressed')

  const navItems = [
    { icon: <ChevronLeft />, tooltip: 'Back', onPress: handleLibrary, selected: true },
    { icon: <ChevronRight />, tooltip: 'Forward', onPress: handleSettings },
  ]

  return (
    <YStack flex={1}>
      <CoNavBarBottom>
        <CoNavBarBottom.Item icon={<PlusCircle />} tooltip="Create" onPress={handleCreate} />
        <CoNavBarBottom.Group>
          {navItems.map((item, idx) => (
            <CoNavBarBottom.GroupItem
              key={idx}
              icon={item.icon}
              tooltip={item.tooltip}
              onPress={item.onPress}
              selected={item.selected}
            />
          ))}
        </CoNavBarBottom.Group>
      </CoNavBarBottom>
    </YStack>
  )
}