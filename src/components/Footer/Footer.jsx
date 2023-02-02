import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { AiFillFacebook, AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
    <MDBFooter style={{backgroundColor: '#435B38', color: '#D6FBD6'}} className='text-center text-lg-start'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>You can also follow us on social media for the latest updates and plant inspiration!</span>
        </div>

        <div>
        <Link className='me-4 text-reset'>
          <AiFillFacebook/>
          </Link>
          <Link className='me-4 text-reset'>
          <AiFillTwitterCircle/>
          </Link>
          <Link className='me-4 text-reset'>
          <AiFillInstagram/>
          </Link>
          <Link className='me-4 text-reset'>
          <AiFillLinkedin/>
          </Link>
          <Link className='me-4 text-reset'>
          <AiFillGithub/>
          </Link>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Plantastic
              </h6>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Our Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Indoor Plants
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Outdoor Plants
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Tropical Plants
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Pet-Friendly Plants
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact Us</h6>
              <p>
                <MDBIcon icon="home" />
                At Plantastic, we are always here to help! If you have any questions or concerns, please don't hesitate to reach out to us.
              </p>
              <p>
                <MDBIcon icon="envelope"/>
                support@plantastic.com
              </p>
              <p>
                <MDBIcon icon="phone"/> (555) 555-5555
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        ©
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Plantastic
        </a>
      </div>
    </MDBFooter>
    </>
  )
}

export default Footer