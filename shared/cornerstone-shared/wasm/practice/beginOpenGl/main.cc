#include <functional>

#include <SDL.h>
#include <stdio.h>

#define GL_GLEXT_PROTOTYPES 1
#include <SDL_opengles2.h>
#include <emscripten.h>

const char *vertexShaderSource =
    "attribute vec4 a_position;\n"
    "void main() {\n"
    "    gl_Position = a_position;\n"
    "}\n";

const char *fragmentShaderSource =
    "precision mediump float;\n"
    "void main() {\n"
    "    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n"
    "}\n";

GLfloat vertices[] = {0.0f, 0.5f, -0.5f, -0.5f, 0.5f, -0.5f};

void render()
{

  printf("wasm--render ::: 红色三角形~~~\n");

  SDL_Window *window;
  SDL_CreateWindowAndRenderer(400, 300, 0, &window, nullptr);

  GLuint vao;
  glGenVertexArraysOES(1, &vao);
  glBindVertexArrayOES(vao);

  GLuint vertexShader = glCreateShader(GL_VERTEX_SHADER);
  glShaderSource(vertexShader, 1, &vertexShaderSource, nullptr);
  glCompileShader(vertexShader);

  GLuint fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
  glShaderSource(fragmentShader, 1, &fragmentShaderSource, nullptr);
  glCompileShader(fragmentShader);

  GLuint program = glCreateProgram();
  glAttachShader(program, vertexShader);
  glAttachShader(program, fragmentShader);
  glLinkProgram(program);
  glUseProgram(program);

  GLuint vbo;
  glGenBuffers(1, &vbo);
  glBindBuffer(GL_ARRAY_BUFFER, vbo);
  glBufferData(GL_ARRAY_BUFFER, 24, vertices, GL_STATIC_DRAW);

  GLint position = glGetAttribLocation(program, "a_position");
  glVertexAttribPointer(position, 2, GL_FLOAT, GL_FALSE, 0, 0);
  glEnableVertexAttribArray(position);


  glClearColor(0, 0, 1, 0);
  glClear(GL_COLOR_BUFFER_BIT);

  glDrawArrays(GL_TRIANGLES, 0, 3);

  glDeleteBuffers(1, &vbo);
}

int main()
{
  render();
}

// 定义一个 updateColor 方法给 js 用。全局会出现一个 _updateColor 方法。
// EMSCRIPTEN_KEEPALIVE 宏防止方法编译时被优化掉
extern "C" void EMSCRIPTEN_KEEPALIVE updateColor(float n1, float n2)
{
  printf("n1: %f, n2: %f\n", n1, n2);
  vertices[0] = n1;
  vertices[1] = n2;
  render();
}