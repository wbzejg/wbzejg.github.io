
export default async function Page({ params }: { params: { page: string } }) {
  return (
    <>
      <div>statements/page/{params.page}</div>
    </>
  )
}