#include <functional>

#include <SDL.h>
#include <stdio.h>

#define GL_GLEXT_PROTOTYPES 1
#include <SDL_opengles2.h>
#include <emscripten.h>

template <typename T>
class vec3
{
public:
  vec3()
  {
    this->x = (T)0;
    this->y = (T)0;
    this->z = (T)0;
  }
  vec3(T x, T y, T z)
  {
    this->x = x;
    this->y = y;
    this->z = z;
  }

  template <typename TT>
  explicit vec3(vec3<TT> v3)
  {
    this->x = (T)v3.x;
    this->y = (T)v3.y;
    this->z = (T)v3.z;
  }

  union
  {
    T x, r;
  };
  union
  {
    T y, g;
  };
  union
  {
    T z, b;
  };
};

typedef vec3<float> vec3f;

extern "C"
{
  // 定义外部方法
  extern bool isHit(float a, float b);
  // 获取渲染模式
  extern int getRenderMode();
}

const char *vertexShaderSource =
    "attribute vec4 a_position;\n"
    "void main() {\n"
    "    gl_Position = a_position;\n"
    "}\n";

const char *fragmentShaderSource =
    "precision mediump float;\n"
    "uniform float r;\n"
    "void main() {\n"
    "    gl_FragColor = vec4(r, 0.0, 0.0, 1.0);\n"
    "}\n";

GLfloat vertices[] = {0.0f, 0.5f, -0.5f, -0.5f, 0.5f, -0.5f};

void render()
{

  bool hit = isHit(vertices[0], vertices[1]);
  if (hit)
  {
    printf("命中🎯");
  }
  int mode = getRenderMode();
  printf("wasm--render ::: 红色三角形~~~\n");
  printf("当前渲染模式为：：%d \n", mode);

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

  float r = mode / 255.0;
  printf("mode/255 %d", r);
  glUniform1f(glGetUniformLocation(program, "r"), r);

  glClearColor(0.47, 0.52, 0.8, 0);
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