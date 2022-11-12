import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";

const App = () => {
  const [isLoading, setIsLoading] = useState(1);
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState(null);

  const nextButton = useMemo(() => {
    if (isLoading) {
      return (
        <div>
          <Spinner animation="grow" />
          로딩 중...
        </div>
      );
    } else {
      return "다음글 보기";
    }
  }, [isLoading]);

  const getPost = useCallback(() => {
    axios
      .get(
        `https://0438fefd-532e-4140-9623-1b3e9a6d1fb3.mock.pstmn.io/posts/${postId}`
      )
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          setPost(response.data);
        } else {
          alert("잘못된 데이터 입니다.");
        }
      })
      .catch((error) => {
        // console.log(response);
        if (error.response.status === 404) {
          alert("페이지가 없습니다.");
        } else {
          alert("문제가 발생했습니다 , 개발자에게 연락주세요");
        }
      })
      .finally(() => {
        setIsLoading(false);
        console.log("무조건 실행");
      });
  }, [postId]);

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    <div>
      {isLoading || post == null ? (
        <div>로딩 중 ...</div>
      ) : (
        <Card style={{ width: "500px" }}>
          <Card.Header>POST 1 데이터</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>{post.userId}</ListGroup.Item>
            <ListGroup.Item>{post.id}</ListGroup.Item>
            <ListGroup.Item>{post.title}</ListGroup.Item>
            <ListGroup.Item>{post.body}</ListGroup.Item>
            <ListGroup.Item>
              <div>댓글 ({post.comments.length})</div>
              {post.comments.map((item, index) => (
                <Card style={{ width: "18rem" }} key={index}>
                  <Card.Header>{item.email}</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>{item.body}</ListGroup.Item>
                  </ListGroup>
                </Card>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      )}
      <button
        onClick={() => setPostId((prev) => prev + 1)}
        disabled={isLoading}
      >
        {nextButton}
        {/* {isLoading ? (
          <div>
            <Spinner animation="grow" />
            로딩 중...
          </div>
        ) : (
          "다음글 보기"
        )} */}
      </button>
    </div>
  );
};

export default App;
