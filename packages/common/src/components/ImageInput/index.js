import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import cx from 'clsx';
import { CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const MIN_SIZE = 1 * 1024;
const MAX_SIZE = 1 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
};
const messages = {
  'rejection-file-invalid-type': 'Please provide a JPG or PNG image',
  'rejection-file-too-large': 'The file is too large',
  'rejection-file-too-small': 'The file is too small',
  'rejaction-unknown': 'Error processing file',
  readerError: 'Error reading file',
};

const useStyles = makeStyles({
  root: {
    alignSelf: 'center',
    padding: 1,
    borderRadius: 2,
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    border: '2px dashed rgba(0, 0, 0, 0.6)',
    width: '100%',

    '&:hover': {
      opacity: '0.75',
    },
  },

  dragActive: {
    borderColor: 'green',
  },

  title: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 12,
    marginBottom: 8,
    display: 'block',
  },

  image: {
    height: '200px',
    width: '100%',
    objectFit: 'contain',
    display: 'block',
  },
});

const ImageInput = ({ label, value, onChange, error, name }) => {
  const classes = useStyles();
  const fileReaderRef = useRef();
  const [rejectionError, setRejectionError] = useState();
  const [loading, setLoading] = useState(false);

  const handleReaderLoad = useCallback(() => {
    const { result } = fileReaderRef.current;
    fileReaderRef.current = undefined;
    onChange({ isNew: true, uri: result });
    setLoading(false);
  }, [onChange]);

  const handleReaderError = useCallback(() => {
    fileReaderRef.current = undefined;
    setRejectionError(messages.readerError);
    setLoading(false);
  }, []);

  const handleDropAccepted = useCallback(
    ([acceptedFile]) => {
      setRejectionError(undefined);
      // Cancel the previous read if it's in progress
      if (fileReaderRef.current) {
        fileReaderRef.current.abort();
        fileReaderRef.current = undefined;
      }

      fileReaderRef.current = new FileReader();
      fileReaderRef.current.onload = handleReaderLoad;
      fileReaderRef.current.onerror = handleReaderError;
      fileReaderRef.current.readAsDataURL(acceptedFile);
      setLoading(true);
    },
    [handleReaderLoad, handleReaderError]
  );

  const handleDropRejected = useCallback(([{ errors = [] } = {}] = []) => {
    setRejectionError(
      messages[`rejection-${errors[0].code}`] || messages['rejaction-unknown']
    );
  }, []);

  useEffect(() => {
    return () => {
      // Cancel the read if the component gets destroyed
      if (fileReaderRef.current) {
        fileReaderRef.current.abort();
        fileReaderRef.current = undefined;
      }
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noDragEventsBubbling: true,
    preventDropOnDocument: true,
    multiple: false,
    minSize: MIN_SIZE,
    maxSize: MAX_SIZE,
    accept: ACCEPTED_FILE_TYPES,
    onDropAccepted: handleDropAccepted,
    onDropRejected: handleDropRejected,
  });

  return (
    <>
      <Typography variant="string" className={classes.title}>
        {label}
      </Typography>

      <div
        {...getRootProps({
          className: cx(classes.root, {
            [classes.dragActive]: isDragActive,
          }),
        })}
      >
        {/* The input is required for the browser to allow opening of the file browser */}
        <input {...getInputProps()} />
        {loading && <CircularProgress />}
        {value.uri && (
          <img className={classes.image} src={value.uri} alt={name} />
        )}
      </div>
      {(rejectionError || error) && (
        <Typography variant="danger">{rejectionError ?? error}</Typography>
      )}
    </>
  );
};

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.shape({
    isNew: PropTypes.bool.isRequired,
    uri: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

ImageInput.defaultProps = {
  error: undefined,
  label: undefined,
};

export default ImageInput;
