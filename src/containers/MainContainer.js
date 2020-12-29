import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import { bindActionCreators } from 'redux'
import MainComponent from '../components/MainComponent'


const mapStateToProps = state => ({
  todos: state.todos
})


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})

/**
 * Redux connection
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent)