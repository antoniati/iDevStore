import { useSession } from 'next-auth/react'

export const useCurrentUserByClientSide = () => {
      const session = useSession()

      return session.data?.user
}