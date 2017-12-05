import React from 'react'
import { shallow } from 'enzyme'

import { Masonry } from '../../src/components/Masonry'
import { data } from '../../src/mocks/data'

const props = {
  cols: 3,
  items: data
}

const spyLoadMoreData = jest.spyOn(Masonry.prototype, 'loadMoreData')

let wrapper

beforeEach(() => {
  wrapper = shallow(
    <Masonry
      {...props}
    />
  )
})

describe('Render', () => {
  it('should render masonry with first data sets', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should load more items', () => {
    expect(spyLoadMoreData).toHaveBeenCalledTimes(1)
  })
})
