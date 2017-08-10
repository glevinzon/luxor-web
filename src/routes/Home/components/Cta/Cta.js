import React, { Component } from 'react'
import { Accordion, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

class Cta extends Component {
  state = {
    faqTexts: null
  }
  componentWillReceiveProps (nextProps) {
    let { preferences } = nextProps
    if (preferences) {
      this.setState({faqTexts: preferences.faqTexts})
    }
  }

  render () {
    return (
      <section id='faqs' className='faqs' style={{textAlign: 'center'}}>
        <h3>Frequently Asked Questions</h3>
        <div className='container' >
          <Panel collapsible defaultExpanded header=''>
          <ListGroup fill>
            <ListGroupItem>
              <Accordion>
                {this.state.faqTexts && this.state.faqTexts.map((faq, key) => {
                  return (
                    <Panel key={key} header={faq.question} eventKey={key}>
                      {faq.answer}
                    </Panel>
                  )
                })}
              </Accordion>
            </ListGroupItem>
          </ListGroup>
        </Panel>
        </div>
      </section>
    )
  }
}

Cta.propTypes = {

}

export default Cta
