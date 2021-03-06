import changeHandler from 'memoized-change-handler'
import React from 'react'
import { connect, } from 'react-redux'
import { values, } from 'ramda'

import { retrieveTopics, createTopic, } from 'Actions'
import TopicItem from 'Components/topics/TopicItem'
import TopicForm from 'Components/topics/TopicForm'
import { ModalLink, ModalRoute } from 'Components/utils/ModalRouter'

import topics from 'Styles/topics.scss'

class Topics extends React.Component {

  componentDidMount() {
    this.props.retrieveTopics()
  }

  render() {
    const { topics, createTopic, updateTopic, destroyTopic } = this.props

    return (
      <section className='topics'>
        <ModalRoute
          path='*/new-topic'
          component={TopicForm}/>
        <ul>

          <li>
            <ModalLink
              to={`${this.props.location.pathname}/new-topic`}>
              + new topic
            </ModalLink>
          </li>

          { topics.map(topic => (
            <TopicItem key={topic.id} topic={topic} />
          ))}

        </ul>
      </section>)
  }
}

const mapStateToProps = (state, ownProps) => ({
  topics: values(state.entities.topics)
})

const mapDispatchToProps = {
  retrieveTopics,
  createTopic,
}

export default connect(mapStateToProps, mapDispatchToProps)(Topics)
