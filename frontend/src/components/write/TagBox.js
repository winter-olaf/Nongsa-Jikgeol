/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'

const CategoryBoxBlock = styled.div`
  width: 100%;
  /* border-top: 1px solid ${palette.gray[2]}; */
  padding-top: 2rem;

  h4 {
    color: ${palette.gray[8]};
    display: flex;
    align-items: center;
  }
`

const CategoryForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid ${palette.gray[9]}; /* 스타일 초기화 */

  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  }

  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: ${palette.gray[8]};
    color: white;
    font-weight: bold;
    /* &:hover {
      background: ${palette.gray[6]};
    } */
  }
`

const Category = styled.div`
  margin-right: 0.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

const CategoryListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`

// React.memo를 사용하여 tag 값이 바뀔 때만 리렌더링되도록 처리
const CategoryItem = React.memo(({ category, onRemove }) => (
  <Category onClick={() => onRemove(category)}>#{category}</Category>
))

// React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
const CategoryList = React.memo(({ categorys, onRemove }) => (
  <CategoryListBlock>
    {categorys.map((category) => (
      <CategoryItem key={category} category={category} onRemove={onRemove} />
    ))}
  </CategoryListBlock>
))

const TagBox = ({ categorys, onChangeCategorys }) => {
  const [input, setInput] = useState('')
  const [localCategorys, setLocalCategorys] = useState([])

  const insertCategory = useCallback(
    (category) => {
      if (!category) return // 공백이라면 추가하지 않음
      if (localCategorys.includes(category)) return // 이미 존재한다면 추가하지 않음
      const nextCategorys = [...localCategorys, category]
      setLocalCategorys(nextCategorys)
      onChangeCategorys(nextCategorys)
    },
    [localCategorys, onChangeCategorys],
  )

  const onRemove = useCallback(
    (category) => {
      const nextCategorys = localCategorys.filter((t) => t !== category)
      setLocalCategorys(nextCategorys)
      onChangeCategorys(nextCategorys)
    },
    [localCategorys, onChangeCategorys],
  )

  const onChange = useCallback((e) => {
    setInput(e.target.value)
  }, [])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      insertCategory(input.trim()) // 앞뒤 공백을 없앤 후 등록
      setInput('') // input 초기화
    },
    [input, insertCategory],
  )

  // tags 값이 바뀔 때
  useEffect(() => {
    setLocalCategorys(categorys)
  }, [categorys])

  const test = css`
    display: flex;
  `

  const test2 = css`
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    color: gray;
  `

  return (
    <CategoryBoxBlock>
      <div css={test}>
        <h4>태그</h4>
        <p css={test2}>(입력된 태그를 클릭하여 지울 수 있습니다.)</p>
      </div>
      <CategoryForm onSubmit={onSubmit}>
        <input
          placeholder="태그를 입력하세요."
          value={input}
          onChange={onChange}
        />
        <button type="submit">추가</button>
      </CategoryForm>
      <CategoryList categorys={localCategorys} onRemove={onRemove} />
    </CategoryBoxBlock>
  )
}

export default TagBox
