import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const AvatarEntity = ({ avatarUrl }: { avatarUrl: string }) => {
  return (
    <Avatar>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default AvatarEntity
