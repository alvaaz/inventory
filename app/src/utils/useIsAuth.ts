import { useMeQuery } from "../generated/graphql";
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useIsAuth = () => {
  const { data: meData, loading: meLoading } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!meLoading && !meData?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [meLoading, meData, router]);
}
