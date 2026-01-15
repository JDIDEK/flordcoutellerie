import { useEffect } from 'react'
import { SlugInputProps, set, setIfMissing, useFormValue } from 'sanity'

import { slugifyString } from '../lib/slugify'

export function AutoSlugInput(props: SlugInputProps) {
  const { onChange, value, schemaType } = props
  const title = useFormValue(['title']) as string | undefined

  useEffect(() => {
    if (value?.current || !title) return

    const slugify =
      ((schemaType.options as { slugify?: (input: string) => string } | undefined)?.slugify ??
        slugifyString) as (input: string) => string
    const newSlug = slugify(title)

    if (!newSlug) return

    onChange(setIfMissing({ _type: 'slug' }))
    onChange(
      set({
        _type: 'slug',
        current: newSlug,
      }),
    )
  }, [title, value, schemaType.options, onChange])

  return props.renderDefault(props)
}
